
interface InputI {
        placeholder?: string,
        onChange?: () => void,


}
export function Input(props: InputI) {
        return (

                <div className="border-b-2 my-10">
                        <input className=" rounded text-xl  p border-none outline-none"
                                type="text" placeholder={props.placeholder} onChange={props.onChange} />
                </div>

        )
}