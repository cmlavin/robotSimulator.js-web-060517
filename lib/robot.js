'use strict';

function Robot() {
  this.orient = function(direction){
    const directions = [ 'east', 'west', 'north', 'south' ]
    if ( directions.includes(direction) ){
      this.bearing = direction
    } else {
      throw new Error("Invalid Robot Bearing")
    }// if valid direction
  }// this.orient

  this.turnRight = function(){
    const turn_obj = {east:"south", west:"north", north:"east", south:"west"}
    this.bearing = turn_obj[this.bearing]
  }// this.turnRight

  this.turnLeft = function(){
    const turn_obj = {east:"north", west:"south", north:"west", south:"east"}
    this.bearing = turn_obj[this.bearing]
  }// this.turnLeft

  this.at = function(x, y){
    this.coordinates = [x, y]
  }// this.at

  this.advance = function(){
    let axis
    if (this.bearing === "east" || this.bearing === "west"){
      axis = 0
    }else {
      axis = 1
    }
    let grid_incr = function(array){ array[axis] += 1}
    let grid_decr = function(array){ array[axis] -= 1}
    const advance_obj = {east: grid_incr, west: grid_decr, north: grid_incr, south: grid_decr}
    advance_obj[this.bearing](this.coordinates)
  }// this.advance

  this.instructions = function(input){
    const input_obj = {L: "turnLeft", R: "turnRight", A: "advance"}
    let input_array = input.split("")
    return input_array.map(function(instruct){
      return input_obj[instruct]
    })
  }// this.instructions

  this.place = function(something){
    this.at(something.x, something.y)
    this.orient(something.direction)
  }// this.place

  this.evaluate = function(move_this){
    let self = this
    let instructs = this.instructions(move_this)
    instructs.forEach(function(instruction){
      self[instruction]()
    })
  }// this.evaluate

}// function Robot()
