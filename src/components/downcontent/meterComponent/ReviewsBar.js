import React from 'react';
import ReviewsProvider from './ReviewsProvider';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ReviewsBar = (props) => {
  const { score } = props;

  // function for calculating the color
  const calcColor = (percent, start, end) => {
    let a = percent / 100,
      b = (end - start) * a,
      c = b + start;

    // return an CSS hsl color string
    return 'hsl(' + c + ', 100%, 50%)';
  };

  return (
    <ReviewsProvider  valueStart={0} valueEnd={score}>
      {(value) => (
        <CircularProgressbar 
        className=' h-[90%] !flex !justify-center mt-[30px] !items-center'
          value={value}
          text={`${value} %`}
          circleRatio={0.58} /* Make the circle only 0.7 of the full diameter */
          styles={{
            trail: {
              strokeLinecap: 'butt',
              transform: 'rotate(-105deg)',
              transformOrigin: 'center center',
            },
            path: {
              strokeLinecap: 'butt',
              transform: 'rotate(-105deg)',
              transformOrigin: 'center center',
              stroke: calcColor(value, 0, 120),
            },
            text: {
              fill: '#ddd',
            },
          }}
          strokeWidth={13}
        />
      )}
    </ReviewsProvider>
  );
};

export default ReviewsBar;
