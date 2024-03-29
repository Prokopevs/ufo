import React from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import {
    fetchPosts,
    fetchTotalCategories,
    postSlice,
} from "../../store/reducers/PostSlice"
import { animateScroll as scroll, scroller } from "react-scroll"
interface IPagination {
    category: number | null
}

const Pagination: React.FC<IPagination> = React.memo(({ category }) => {
    const dispatch = useAppDispatch()
    const { limit, currentPage, portionNumber, totalCategories } = useAppSelector(
        (state) => state.postReducer
    )
    const { setCurrentPage, setPortionNumber } = postSlice.actions

    React.useEffect(() => {
        dispatch(fetchTotalCategories())
    }, [])

    React.useEffect(() => {
        onPortionChanged(Math.ceil(currentPage / 3))
    }, [currentPage])

    const scrollTo = () => {
        scroller.scrollTo("top", {
            duration: 1000,
            delay: 200,
            smooth: "easeInOutQuart",
        })
    }

    let totalCount = 0
    if (category === null) {
        totalCategories.forEach((item) => {
            totalCount += item.totalCount
        })
    } else {
        let quantityPosts = totalCategories.find((item) => item.id === category)
        if (quantityPosts) {
            totalCount = quantityPosts.totalCount
        }
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber))
        dispatch(fetchPosts(category, pageNumber, limit))
        scrollTo()
    }
    const onPortionChanged = (portionNumber: number) => {
        dispatch(setPortionNumber(portionNumber))
    }

    const pagesCount = Math.ceil(totalCount / limit) // 15 статей / 3 = 5
    let pages: Array<number> = [] // 1 2 3 4 5...
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionSize = 3

    let portionCount = Math.ceil(pagesCount / portionSize) // 5 / 3 = 2
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1 // (1(по умолчанию) - 1) * 3 + 1 = 0
    let rightPortionPageNumber = portionNumber * portionSize // 1 * 3

    return (
        <ul className="pagination">
            <li className="pagination__item">
                <a
                    className={
                        portionNumber > 1
                            ? "pagination__link"
                            : "pagination__link pagination__link--button"
                    }
                    onClick={
                        portionNumber > 1
                            ? () => {
                                  onPortionChanged(portionNumber - 1)
                              }
                            : () => {}
                    }
                >
                    &lt;
                </a>
            </li>

            {pages
                .filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p, index) => (
                    <li
                        className="pagination__item"
                        key={index}
                        onClick={() => onPageChanged(p)}
                    >
                        <a
                            className={
                                currentPage === p
                                    ? "pagination__link  pagination__link active"
                                    : "pagination__link"
                            }
                        >
                            {p}
                        </a>
                    </li>
                ))}

            <li className="pagination__item">
                <a
                    className={
                        portionCount > portionNumber
                            ? "pagination__link"
                            : "pagination__link pagination__link--button"
                    }
                    onClick={
                        portionCount > portionNumber
                            ? () => {
                                  onPortionChanged(portionNumber + 1)
                              }
                            : () => {}
                    }
                >
                    &gt;
                </a>
            </li>
        </ul>
    )
})

export default Pagination
