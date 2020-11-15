var BrokerBot
if(!BrokerBot) BrokerBot = {};
BrokerBot.version  = 2.031
BrokerBot.minthreshold = 5.00
BrokerBot.maxthreshold = 105.00
BrokerBot.values = []
BrokerBot.maxbuy = []

BrokerBot.Inits = function() {
  var proceed = false
  if(BrokerBot.version == Game.version){
    if (Game.ObjectsById[5].level != 0) {
      proceed = true
    }
    else {
      Game.Notify("BrokerBot","Warning: Stock Market Minigame is not loaded",[1,33],100)
    }
  }
  else {
    Game.Notify("BrokerBot","Warning: BakingBot is last tested with "+"cookie clicker version " + BrokerBot.version,[1,33],100)
  }
  if(proceed) {
    BrokerBot.starter = setInterval(BrokerBot.run,1000)
    Game.Notify("BrokerBot","BrokerBot is running",[1,33],100)
  }
  Game.Win('Third-party')
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

BrokerBot.cangoodbuy = function(id) {
  BrokerBot.overhead = 1+0.01*(20*Math.pow(0.95,BrokerBot.minigame.brokers))
  var abbrev = BrokerBot.goodsById[id].val * Game.cookiesPsRawHighest * BrokerBot.maxbuy[id] * BrokerBot.overhead
  if (Game.cookies < abbrev) {
    return false
  } else {
    return true
  }
}

BrokerBot.buy = function(){
  BrokerBot.valuefun()
  BrokerBot.maxbuyfun()
  for (var i = 0; i < BrokerBot.goodsById.length; i++) {
    if(BrokerBot.values[i] < BrokerBot.minthreshold && BrokerBot.goodsById[i].active && BrokerBot.cangoodbuy(i) ){
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
  if(!BrokerBot.minigame)  BrokerBot.minigame  = Game.ObjectsById[5].minigame
  if(!BrokerBot.goodsById) BrokerBot.goodsById = Game.ObjectsById[5].minigame.goodsById
  BrokerBot.buy()
  BrokerBot.sell()
  BrokerBot.show()
}

BrokerBot.Inits();
