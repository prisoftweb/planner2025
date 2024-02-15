export interface User{
  'id': string,
  'photo': string,
  'name': string,
  'profile': {
    'status': boolean,
    'role': string, 
  },
  'email': string
}