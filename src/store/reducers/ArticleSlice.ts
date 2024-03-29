import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getArticle } from "../../http/getArticle"
import { IArticle } from "../../models/IArticle"
import { AppDispatch } from "../store"

interface ArticleState {
    article: IArticle
    articleIsLoading: boolean
    articleClick: boolean
    selectedArticleId: null | string
    queryFromRecommend: boolean
    error: boolean

}

const initialState: ArticleState = {
    article: {} as IArticle,
    articleIsLoading: false,
    articleClick: false,
    selectedArticleId: null,
    queryFromRecommend: false,
    error: false,
}

export const ArticleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setArticleLoading(state, action: PayloadAction<boolean>) {
            state.articleIsLoading = action.payload
        },
        setArticle(state, action: PayloadAction<IArticle>) {
            state.article = action.payload
        },
        setArticleClick(state, action: PayloadAction<boolean>) {
            state.articleClick = action.payload
        },
        setSelectedArticleId(state, action: PayloadAction<string>) {
            state.selectedArticleId = action.payload
        },
        setQueryFromRecommend(state, action: PayloadAction<boolean>) {
            state.queryFromRecommend = action.payload
        },
        setError(state, action: PayloadAction<boolean>) {
            state.error = action.payload
        },
    }
})

export const fetchArticle = (id: number, onArticleBlockClick: boolean ) => async (dispatch: AppDispatch) => {
    try {
        dispatch(ArticleSlice.actions.setArticleLoading(true))
        const response = await getArticle(id)
        dispatch(ArticleSlice.actions.setArticle(response.data))
        if (onArticleBlockClick) {
            dispatch(ArticleSlice.actions.setArticleClick(true))
        }
        
    } catch (e) {
        dispatch(ArticleSlice.actions.setError(true))
    } finally {
        dispatch(ArticleSlice.actions.setArticleLoading(false))
        dispatch(ArticleSlice.actions.setQueryFromRecommend(false))
    }
}

export default ArticleSlice.reducer
