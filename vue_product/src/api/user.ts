import $http from './index'

export interface User {
  id?: number
  name: string
  password: string
  code?: string
}

export interface Response {
  status: number
  message: string
  data: any
}

export function getCodeAPI() {
  return $http.get('/user/code')
}

export function getUserListAPI(body): Promise<Response> {
  return $http.get('/user', { params: body })
}
export function getUserOneAPI(id: number): Promise<Response> {
  return $http.get(`/user/${id}`)
}

export function createUserAPI(body: User): Promise<Response> {
  return $http.post('/user', body)
}

export function updateUserAPI(body: User): Promise<Response> {
  return $http.patch(`/user/${body.id}`, body)
}

export function DeleteUserAPI(id: number): Promise<Response> {
  return $http.delete(`/user/${id}`)
}


//添加tag
export function addTags(data: { id: number, tags: string[] }) {
  return $http.post(`/user/add/tags`, data)
}