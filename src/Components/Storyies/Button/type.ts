export default interface IButton {
    isLoading: boolean 
    titile: string
    onClick: () => void
    backgroundColor: string
    styles: object
    rounded : boolean
}