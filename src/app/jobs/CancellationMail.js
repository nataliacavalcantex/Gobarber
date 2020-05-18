import Mail from '../../lib/Mail'
import pt from 'date-fns/locale/pt'
import {startOfHour,parseISO,isBefore,format,subHours } from 'date-fns'
class CancellationMail{
    get key(){
        return 'CancellationMail'
    }
    async handle({data}){
        const {appointment}=data
        await Mail.sendMail({
            to:`${appointment.provider.name} <${appointment.provider.email}>`,
            subject:'Agendamento Cancelado',
            template:'cancelation',
            context:{
                provider:appointment.provider.name,
                user:appointment.user.name,
                date:formatedData
            }
        })
    }
}
export default new CancellationMail()