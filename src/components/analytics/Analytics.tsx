import React from 'react';
import { AnalyticsWrapper, ContentWrapper } from './Analytics-style';
import chart from './chart.png'
import './analytics.css'

const Analytics = () => {
    return (
        <AnalyticsWrapper>
            <ChartWrapper />
            <Content />
            <Content />
        </AnalyticsWrapper>
    );
};

const ChartWrapper = () => {
    return (
        <div className={'chart_analytic__wrapper'}>
            <div className={'chart__content'}>General progress chart</div>
            <div>
                <img width={'100%'} src={chart} alt={'#'}/>
            </div>
        </div>
    )
}

const Content = () => {
    return (
        <ContentWrapper>
            <div className={'chart__content'}>Content views for last 30 days</div>
            <div className={'content__info'}>30 views</div>
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