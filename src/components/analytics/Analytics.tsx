import React, {useEffect, useState} from 'react';
import { AnalyticsWrapper, ContentWrapper } from './Analytics-style';
// import chart from './chart.png'
import './analytics.css'
import styled, { keyframes } from "styled-components";

const Analytics = () => {
    return (
        <AnalyticsWrapper>
            <ChartWrapper />
            <Content />
            <Content />
        </AnalyticsWrapper>
    );
};

const ChartStyleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  min-height: 220px;
  font-size: 7px;
  color: #2f9dfb;
  text-align:center;
  margin-top: 15px;
  
  &>div{
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      
      &>div{
        height: 200px;
        display: flex;
        align-items: flex-end;
      }
  }
`
const heightAnimation = (height:string | number) => keyframes`
  from {
    height: 0;
  }

  to {
    height: ${height}%;
  }
`;
type chartProps = {
    height: string | number
    content: string | number
}
const ChartBlock = styled.div`
  background: linear-gradient(to bottom, #289afd, #ffffff ) ;
  height: ${(props:chartProps) => props.height + '%'};
  width: 28px;
  margin: 0 0.5px 8px 0.5px;
  cursor: pointer;
  transition: background 0.5s linear;
  animation: ${(props:chartProps) => heightAnimation(props.height)} 0.8s linear;
  
  &:hover{
    background: #289afd;
  }
  &:hover:after{
    content: ${(props:chartProps)=> props.content ? props.content : '15' };
    color: #ffffff;
    font-size: 13px;
  }
`

const ChartWrapper = () => {
    const [maxHeight, setMaxHeight] = useState(0)
    const data = [
        { name: '10nov', value: 10 },
        { name: '11nov', value: 20 },
        { name: '12nov', value: 35 },
        { name: '13nov', value: 50 },
        { name: '14nov', value: 40 },
        { name: '15nov', value: 30 },
        { name: '16nov', value: 20 },
        { name: '17nov', value: 10 }
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
            <div className={'chart__content'}>General progress chart</div>
            <div>
                <ChartStyleWrapper>
                    {
                        data.map((el) => (
                            <div key={el.name}>
                                <div>
                                    <ChartBlock content={el.value} height={(el.value*100)/maxHeight} />
                                </div>
                                {el.name}
                            </div>
                        ))
                    }
                </ChartStyleWrapper>
            </div>
        </div>
    )
}

const Content = () => {
    return (
        <ContentWrapper>
            <div className={'chart__content'}>Content views for last 30 days</div>
            <div className={'content__info'}>30</div>
            <div className={'chart__content functions'}>
                <div>
                    <div>previous</div>
                    <div>0</div>
                </div>
                <div>
                    <div>change</div>
                    <div>+30</div>
                </div>
            </div>
        </ContentWrapper>
    )
}

export default Analytics;