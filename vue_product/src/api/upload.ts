import $http from './index'

export function upload(file: FormData) {
  return $http.post('/file/upload', file)
}
