import {
    takeEvery
} from 'redux-saga'

import {
    put,
    call
} from 'redux-saga/effects'


import checkAccessToken from '../API/checkAccessToken.js'
import createComment from '../API/createComment.js'

import {
    REQUEST_LEAVE_COMMENT,
    FAIL_TO_LEAVE_COMMENT,
    SUCCESS_LEAVE_COMMENT
} from '../actions/leaveComment.js'

import {
    REQUEST_FETCH_COMMENTS
} from '../actions/fetchComments.js'

export function* watchRequestLeaveComment() {
    yield call(takeEvery, REQUEST_LEAVE_COMMENT, leaveCommentFlow)
}

export function* leaveCommentFlow(action) {
    const params = action.params
    const valid = yield call(checkAccessToken, {
        access_token: params.access_token
    })
    if (valid) {
        const comment = yield call(createComment, params)
        yield put({
            type: REQUEST_FETCH_COMMENTS,
            job_id: params.job_id
        })
    } else {
        yield put({type: FAIL_TO_LEAVE_COMMENT, error: new Error('Invalid access token')})
    }
}