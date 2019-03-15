function move_at_angle(posX, posY, angle, move_distance){
  return [posX + Math.cos(angle) * move_distance,
          posY + Math.sin(angle) * move_distance];
}
