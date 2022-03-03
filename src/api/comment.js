/**
 * 评论请求模块
 */
import request from '@/utils/request'

/**
  * 获取文章列表
  */
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

/**
 * 对评论或评论回复点赞
 */
export const addCommentLike = commentId => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}

/**
 * 取消对评论或评论回复点赞
 */
export const deleteCommentLike = commentId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${commentId}`
  })
}

/**
 * 添加评论或评论回复
 */
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
