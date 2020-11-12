var BrokerBot
if(!BrokerBot) BrokerBot = {};
BrokerBot.version  = 2.031
BrokerBot.minigame = Game.ObjectsById[5].minigame
BrokerBot.minthreshold = 5.00
BrokerBot.maxthreshold = 105.00
BrokerBot.goodsById = BrokerBot.minigame.goodsById
BrokerBot.values = []
BrokerBot.maxbuy = []
BrokerBot.Inits = function() {
  var proceed = false
  if(BrokerBot.version == Game.version){ proceed = true}
  if(proceed) {BrokerBot.starter = setInterval(BrokerBot.run,1000);}
}

BrokerBot.stop = function(){
  clearInterval(BrokerBot.starter);
}

BrokerBot.valuefun = function(){
  for (var i = 0; i < BrokerBot.goodsById.length; i++) {
    BrokerBot.values[i] = BrokerBot.goodsById[i].val
  }
}

BrokerBot.maxbuyfun = function(){
  for (var i = 0; i < BrokerBot.goodsById.length; i++) {
    BrokerBot.maxbuy[i] = BrokerBot.minigame.getGoodMaxStock(BrokerBot.goodsById[i])
  }
}

BrokerBot.buy = function(){
  BrokerBot.valuefun()
  BrokerBot.maxbuyfun()
  for (var i = 0; i < BrokerBot.goodsById.length; i++) {
    if(BrokerBot.values[i] < BrokerBot.minthreshold && BrokerBot.goodsById[i].active){
      BrokerBot.minigame.buyGood(i,BrokerBot.maxbuy[i])
    }
  }
}

BrokerBot.sell = function(){
  BrokerBot.valuefun()
  BrokerBot.maxbuyfun()
  for (var i = 0; i < BrokerBot.goodsById.length; i++) {
    if(BrokerBot.values[i] > BrokerBot.maxthreshold){
      BrokerBot.minigame.sellGood(i,BrokerBot.maxbuy[i])
    }
  }
}

BrokerBot.show = function(){
  for (var i = 0; i < BrokerBot.goodsById.length; i++) {
    if(Game.ObjectsById[5].minigame.goodsById[i].stock > 0){BrokerBot.goodsById[i].hidden = false}
    else {BrokerBot.goodsById[i].hidden = true}
    BrokerBot.minigame.updateGoodStyle(i)
    BrokerBot.minigame.checkGraphScale()
  }
}

BrokerBot.run = function(){
  BrokerBot.buy()
  BrokerBot.sell()
  BrokerBot.show()
}
