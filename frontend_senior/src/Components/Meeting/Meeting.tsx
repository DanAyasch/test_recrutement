import { getColor, getCorrespondingHeight, getDistanceFromTop } from "./utils";

interface MeetingProps {
  key: string;
  minutes: string;
  duration: number;
  index: number;
  isAbsolute?: boolean;
  width: string;
}

const Meeting = ({
  key,
  minutes,
  duration,
  index,
  isAbsolute,
  width,
}: MeetingProps) => {
  return (
    <div
      key={key}
      style={{
        marginLeft: 5,
        borderRadius: 4,
        marginTop: getDistanceFromTop(minutes),
        height: getCorrespondingHeight(duration),
        background: getColor(index),
        width,
        zIndex: 1,
        ...(isAbsolute && { position: "absolute" }),
      }}
    ></div>
  );
};

export default Meeting;
