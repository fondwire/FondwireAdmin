import React, {useEffect, useState} from 'react';
import { AnalyticsWrapper } from './Analytics-style';
// import chart from './chart.png'
import './analytics.css'
import styled, { keyframes } from "styled-components";
const Analytics = () => {
    return (
        <AnalyticsWrapper>
            <ChartWrapper />
            {/*<Content />*/}
            {/*<Content />*/}
        </AnalyticsWrapper>
    );
};

const ChartStyleWrapper = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  font-size: 11px;
  font-family: 'Gotham-Medium', sans-serif;
  color: #000000;
  text-align:center;
  margin-top: 15px;
  min-width: 450px;
  &>div{
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      //margin: 1px 0;
      padding: 0 25px;
      &>span{
        width: 100px;
        text-align:left;
      }
      &>div{
        width: 100%;
        height: 28px;
        display: flex;
        //align-items: flex-end;
      }
  }
`
const heightAnimation = (height:string | number) => keyframes`
  from {
    width: 0;
  }

  to {
    width: ${height}%;
  }
`;
type chartProps = {
    width: string | number
    content: string | number
}
const ChartBlock = styled.div`
  background: linear-gradient(to left, #289afd, #ffffff ) ;
  width: ${(props:chartProps) => props.width + '%'};
  height: 25px;
  margin: 0 1px 8px 1px;
  cursor: pointer;
  transition: background 0.5s linear;
  animation: ${(props:chartProps) => heightAnimation(props.width)} 0.8s linear;
  position:relative;
  &:hover{
    background: #289afd;
  }
  &::after{
    content: ${(props:chartProps)=> props.content ? `"${props.content}"` : " " };
    position: absolute;
    top: 0;
    right: -35px;
    color: #000000;
    font-size: 13px;
    line-height: 25px;
  }
`

const ChartWrapper = () => {
    const [maxHeight, setMaxHeight] = useState(0)
    const data = [
        { name: 'June', value: 10 },
        { name: 'July', value: 20 },
        { name: 'August', value: 35 },
        { name: 'September', value: 50 },
        { name: 'October', value: 40 },
        { name: 'November', value: 30 },
    ]
    useEffect(()=>{
        data.forEach((dataItem) => {
            if(maxHeight < dataItem.value){
                setMaxHeight(dataItem.value)
            }
        })
    }, [data, maxHeight])
    return (
        <div className={'chart_analytic__wrapper'}>
            <div className={'chart__content'}>VIEWS PER MONTH - LAST 6 MONTH</div>
                <ChartStyleWrapper>
                    {
                        data.map((el) => (
                            <div key={el.name}>
                                <span>{el.name}</span>
                                <div>
                                    <ChartBlock content={el.value} width={(el.value*100)/maxHeight} />
                                </div>
                            </div>
                        ))
                    }
                </ChartStyleWrapper>
        </div>
    )
}

// const Content = () => {
//     return (
//         <ContentWrapper>
//             <div className={'chart__content'}>Content views for last 30 days</div>
//             <div className={'content__info'}>30</div>
//             <div className={'chart__content functions'}>
//                 <div>
//                     <div>previous</div>
//                     <div>0</div>
//                 </div>
//                 <div>
//                     <div>change</div>
//                     <div>+30</div>
//                 </div>
//             </div>
//         </ContentWrapper>
//     )
// }

export default Analytics;