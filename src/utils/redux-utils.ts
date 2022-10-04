import {useAppDispatch} from "../store/store";
import {useMemo} from "react";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";



export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch()

    const boundActions = useMemo(() => {
        console.log("useaction")
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}
