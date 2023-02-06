export function getCorrespondingHeight(duration: number) {
  return (duration / 60) * 50;
}

export function getCorrespondingWidth(
  count: number,
  overlap: number,
  index: number
) {
  if (overlap > 0 && index === 0) return 95 / overlap;
  return 95 / count;
}

export function getDistanceFromTop(minutes: string) {
  return (parseInt(minutes) / 60) * 50;
}

export function getColor(index: number) {
  switch (index) {
    case 0:
      return "#f00";
    case 1:
      return "#00f";
    case 2:
      return "#0ff";
    case 3:
      return "#ff0";
    case 4:
      return "#f0f";
    case 5:
      return "#0f0";
    default:
      return "#000";
  }
}
