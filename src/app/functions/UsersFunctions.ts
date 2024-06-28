import { UsrBack, User } from "@/interfaces/User"

export function DataUsersToTableData(users:UsrBack[]){
  let data:User[] = [];
  users.map((user:any) => {
    data.push({
      'id': user._id,
      'photo': user.photo? user.photo: '/img/default.jpg',
      'name': user.name,
      'profile': {
        'role': user.role,
        'status': user.status
      },
      'email': user.email,
      'department': user.department.name,
      'role': user.rol? user.rol.name : 'sin rol'
    })
  });

  return data;
}