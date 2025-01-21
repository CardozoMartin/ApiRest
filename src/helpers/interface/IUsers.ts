export interface IUsers extends Document{
    nombre:string,
    apellido:string,
    email:string,
    password:string,
    isActive:boolean

}