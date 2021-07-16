import useEffectOnce from './use-effect-once'

const useMount = (fn: () => void) => {
    useEffectOnce(() => {
        fn()
    })
}

export default useMount
