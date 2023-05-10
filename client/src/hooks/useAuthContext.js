import AuthContext  from '../context/AuthContext'
import { useContext } from 'react'

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw Error('Auth context must be used inside of Auth context provider')
    }
    return context
}

export default useAuthContext