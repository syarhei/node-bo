const express = require('express');

module.exports = (betController, clientController) => {
    const bet = express.Router();

    bet.get('/', (request, response) => {
        let params = request.query;
        let nickname = response.nickname;
        if (nickname == 'admin') {  // если админ то возвращает все ставки, иначе только те которые принадлежат данному пользователю
            betController.getBets(params).then((result) => {
                response.json(result);
            }).catch((error) => {
                response.json(error);
            });
        }
        else {
            betController.getBets_byClient(params, nickname).then((result) => {
                response.json(result);
            }).catch((error) => {
                response.json(error);
            })
        }
    });

    bet.post('/', (request, response) => {
        let params = request.body;
        let nickname = response.nickname;
        clientController.updateBalance_createBet({ cost: -params.cost, nickname: nickname }).then((data) => {
            betController.createBet(params, nickname).then((result) => {
                response.json(result);
            })
        }).catch((error) => {
            response.json(error);
        })
    });

    bet.delete('/', (request, response) => {
        let params = request.body;
        let nickname = response.nickname;
        betController.getBet_byId(params.id_bet).then((bet) => {
            if (bet == undefined) throw ({message: "id_bet is undefined"});
            clientController.updateBalance_createBet({ cost: bet.cost, nickname: nickname }).then((data) => {
                betController.deleteBet(params, nickname).then((result) => {
                    response.json(result);
                })
            })
        }).catch((error) => {
            response.json(error);
        })

    });

    return bet;
};