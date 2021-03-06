import React from 'react'
import Blocks from '../components/homeComponents/Blocks'
import Pagination from '../components/homeComponents/Pagination'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchPosts, postSlice } from '../store/reducers/PostSlice'

const Home = () => {
    const dispatch = useAppDispatch()
    const {posts, isLoading, currentPage} = useAppSelector(state => state.postReducer)
    const {category} = useAppSelector(state => state.filterReducer)
    const {setPortionNumber} = postSlice.actions

    React.useEffect(() => {
        dispatch(fetchPosts(category, null, currentPage))
        dispatch(setPortionNumber(1)) // Установить номер порции пагинации в 1
    }, [category])

    return (
        <>
            <div className='post__none' id="top">ok</div>
            {posts.map((obj, index) => (<Blocks
                key={index}
                isLoading={isLoading}
                {...obj}
            />))}
            
            {!isLoading && <Pagination category={category} />}
        </>
    )
}

export default Home
