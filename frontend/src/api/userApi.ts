import http from './http'
import type { UpdateUserType } from '@/types/types'

export function getUserDetail() {
	return http.get('/users/profile')
}

export async function updateUserInfo(userDto: UpdateUserType) {
    return http.patch('/users', userDto)
}

export async function uploadProfileImage(formData: FormData) {
    return http.post('/users/upload/image', formData, {
        headers: { 'Content-type': 'multipart/form-data' }
    })
}
