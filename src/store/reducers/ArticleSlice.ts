import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getArticle } from "../../http/getArticle"
import { IArticle } from "../../models/IArticle"
import { AppDispatch } from "../store"

interface ArticleState {
    article: IArticle
    articleIsLoading: boolean
    articleClick: boolean
    selectedArticleId: null | number
}

const initialState: ArticleState = {
    article: {} as IArticle,
    articleIsLoading: false,
    articleClick: false,
    selectedArticleId: null
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
        setSelectedArticleId(state, action: PayloadAction<number>) {
            state.selectedArticleId = action.payload
        },
    }
})

export const fetchArticle = (id: number ) => async (dispatch: AppDispatch) => {
    try {
        dispatch(ArticleSlice.actions.setArticleLoading(true))
        const response = await getArticle(id)
        dispatch(ArticleSlice.actions.setArticle(response.data))
        dispatch(ArticleSlice.actions.setArticleClick(true))
    } catch (e) {
        console.log("error")
    } finally {
        dispatch(ArticleSlice.actions.setArticleLoading(false))
    }
}

export default ArticleSlice.reducer
