///<reference path="../../typings/tsd.d.ts"/>
'use strict';

import assert = require('assert');

import dice = require('./dice');

import _ = require('lodash');

describe('dice', function () {
  it('should roll 3d6', function () {
    var results = dice.roll(3,6);
    assert(1 <= results, 'was not greater than 1');
  });

  it('should roll bell curve in 100000 rolls of 3d6', function () {
    var rolls = 100000;
    var counts = [];
    _.each(new Array(rolls),()=>{
      var result = dice.roll(3,6);
      if(counts[result]){
        counts[result]++;
      }
      else{
        counts[result]=1;
      }
    });
    var highValue = 0;
    var highDie = 0;
    _.each(counts,(hits,key)=>{
      if(hits>highValue){
        highValue = hits;
        highDie = key;
      }
    });

    assert(highDie > 9 && highDie < 12, 'was not a bell curve between 10 and 11');
  });

  it('should roll expanded dice in 10000 rolls', function () {
    var rolls = 10000;
    var highValue = 0;
    _.each(new Array(rolls),()=>{
      var result = dice.roll(3,6,true);
      result > highValue ? console.log(result):'';
      highValue = result > highValue ? result : highValue;
    });
    assert(highValue > 18, 'did not roll expanded dice');
  });

  it('should see expanded dice ratio at 1:40', function () {
    var rolls = 10000;
    var countOver18 = 0;
    _.each(new Array(rolls),()=>{
      var result = dice.roll(3,6,true);
      if(result > 18) countOver18++;
    });
    console.log((countOver18*100)/rolls);
    assert(countOver18 > 18, 'did not roll expanded dice');
  });
});