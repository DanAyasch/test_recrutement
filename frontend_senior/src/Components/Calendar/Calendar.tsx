import React, { useEffect } from "react";
import { calendarConfig } from "./calendarConfig";
import JsonInput from "../../input.json";
import Meeting from "../Meeting/Meeting";
import { getCorrespondingWidth } from "../Meeting/utils";

const Calendar = () => {
  const [configuredData, setConfiguredData] = React.useState<any>([]);
  useEffect(() => {
    const result = calendarConfig.map((item, index) => {
      const overlap = hasOverlap(item.hour, index);
      const found = JsonInput.map((element) => {
        const hour = element.start.split(":")[0];
        let res = undefined;
        if (
          parseInt(hour) >= item.hour &&
          parseInt(hour) < calendarConfig[index + 1].hour
        ) {
          res = { ...element, hasOverlap: overlap };
        }
        return res;
      }).filter((element) => element !== undefined);

      return {
        ...item,
        events: found,
      };
    });

    setConfiguredData(result);
  }, []);

  // This function check if there is an overlap in the calendar for a given hour
  // So it return the number of overlap on the same hour
  function hasOverlap(parentHour: number, index: number) {
    const found = JsonInput.map((element) => {
      const hour = element.start.split(":")[0];
      const minutes = element.start.split(":")[1];

      const time = parseInt(hour) + parseInt(minutes) / 60;

      const finalTime = time + element.duration / 60;

      if (
        finalTime > parentHour &&
        parseInt(hour) < calendarConfig[index + 1]?.hour
      ) {
        return element;
      }
      return undefined;
    }).filter((element) => element !== undefined);
    return found.length;
  }

  return (
    <div>
      <h1>Calendar</h1>
      <div
        style={{
          margin: "auto",
          width: 400,
          height: "1200",
        }}
      >
        {configuredData.map((hourEvent: any) => {
          const sortedEvents = hourEvent.events.sort(
            (prevEvents: any, events: any) => {
              const prevTime =
                parseInt(prevEvents.start.split(":")[0]) +
                parseInt(prevEvents.start.split(":")[1]) / 60;
              const prevFinalTime = prevTime + prevEvents.duration / 60;

              const currentTime =
                parseInt(events.start.split(":")[0]) +
                parseInt(events.start.split(":")[1]) / 60;
              const currentFinalTime = currentTime + events.duration / 60;

              return prevFinalTime - currentFinalTime;
            }
          );
          return (
            <div
              key={hourEvent.hour}
              style={{ display: "flex", flexDirection: "row", width: "100%" }}
            >
              <p style={{ width: 30, marginRight: 20 }}>{hourEvent.hour}</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderTop: "1px solid #888",
                  width: "100%",
                  height: 50,
                  borderLeft: "1px solid #888",
                  borderRight: "1px solid #888",
                }}
              >
                {hourEvent.events.length > 1 ? (
                  // Here we handle more than 1 event in the same hour
                  // So the hour is split in 2 blocks on the same row
                  <>
                    <div
                      style={{
                        position: "relative",
                        width: "50%",
                        height: 50,
                      }}
                    >
                      {sortedEvents
                        .slice(0, Math.ceil(hourEvent.events.length / 2))
                        .map((event: any, index: number) => {
                          const minutes = event.start.split(":")[1];
                          return (
                            <Meeting
                              key={event.id}
                              minutes={minutes}
                              duration={event.duration}
                              index={index}
                              width="97%"
                              isAbsolute
                            />
                          );
                        })}
                    </div>
                    <div
                      style={{
                        position: "relative",
                        width: "50%",
                        height: 50,
                      }}
                    >
                      {sortedEvents
                        .slice(
                          Math.ceil(hourEvent.events.length / 2),
                          hourEvent.events.length
                        )
                        .map((event: any, index: number) => {
                          const minutes = event.start.split(":")[1];

                          return (
                            <Meeting
                              key={event.id}
                              minutes={minutes}
                              duration={event.duration}
                              index={index}
                              width="97%"
                            />
                          );
                        })}
                    </div>
                  </>
                ) : (
                  // Here we handle only 1 event in the same hour
                  // So we have only one block on the row
                  sortedEvents.map((event: any, index: number) => {
                    const minutes = event.start.split(":")[1];

                    return (
                      <Meeting
                        key={event.id}
                        minutes={minutes}
                        duration={event.duration}
                        index={index}
                        width={`${getCorrespondingWidth(
                          hourEvent.events.length,
                          event.hasOverlap,
                          index
                        )}%`}
                      />
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
