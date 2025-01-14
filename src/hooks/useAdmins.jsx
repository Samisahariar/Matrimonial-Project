import { useContext } from 'react';
import { AuthContext } from '../components/AuthInformation';
import useAxiousSecure from './useAxiousSecure';
import { useQuery } from '@tanstack/react-query';


const useAdmins = () => {
    const {user, loader} = useContext(AuthContext);
    const axiosSecure = useAxiousSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loader,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            // console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};


export default useAdmins;