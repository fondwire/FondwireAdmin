import React from 'react';
import {FeedPageWrapper} from "./Feed-page";
import FeedHeader, {FeedComponent, CreateNew} from "../../components/feedComponents/FeedComponents";
import SearchInput from '../../components/Search-Input/Search-Input';


function Feed() {
    return (
        <FeedPageWrapper>
            <div className={'header'}>
                <h3>FEEDS</h3>
                <div>
                    <SearchInput />
                    <CreateNew />
                </div>
            </div>
            <div>
                <FeedHeader />
                <FeedComponent
                    id={2}
                    title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}
                    date={'Oct 25'}
                    type={'VIDEO'}
                    status={'draft'}
                />
                <FeedComponent
                    id={2}
                    title={'Tesla had just revealed its plans to join Nikola.'}
                    date={'Oct 25'}
                    type={'ARTICLE'}
                    status={'Active'}
                />
                <FeedComponent
                    id={2}
                    title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}
                    date={'Oct 25'}
                    type={'EVENT'}
                    status={'Pending'}
                />
                <FeedComponent
                    id={2}
                    title={'Tesla had just revealed its plans to join Nikola.'}
                    date={'Oct 25'}
                    type={'PODCAST'}
                    status={'Expired'}
                />
                <FeedComponent
                    id={2}
                    title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}
                    date={'Oct 25'}
                    type={'VIDEO'}
                    status={'draft'}
                />
                <FeedComponent
                    id={2}
                    title={'Tesla had just revealed its plans to join Nikola.'}
                    date={'Oct 25'}
                    type={'ARTICLE'}
                    status={'Active'}
                />
                <FeedComponent
                    id={2}
                    title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}
                    date={'Oct 25'}
                    type={'EVENT'}
                    status={'Pending'}
                />
                <FeedComponent
                    id={2}
                    title={'Tesla had just revealed its plans to join Nikola.'}
                    date={'Oct 25'}
                    type={'PODCAST'}
                    status={'Expired'}
                />
                <FeedComponent
                    id={2}
                    title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}
                    date={'Oct 25'}
                    type={'VIDEO'}
                    status={'draft'}
                />
                <FeedComponent
                    id={2}
                    title={'Tesla had just revealed its plans to join Nikola.'}
                    date={'Oct 25'}
                    type={'ARTICLE'}
                    status={'Active'}
                />
                <FeedComponent
                    id={2}
                    title={'Tesla had just revealed its plans to join Nikola. Tesla had just revealed its plans to join Nikola.'}
                    date={'Oct 25'}
                    type={'EVENT'}
                    status={'Pending'}
                />
                <FeedComponent
                    id={2}
                    title={'Tesla had just revealed its plans to join Nikola.'}
                    date={'Oct 25'}
                    type={'PODCAST'}
                    status={'Expired'}
                />
            </div>
        </FeedPageWrapper>
    );
}

export default Feed;