export const FormatBadge = (status: boolean | string) => {
    return (
        <div
            className="flex items-center gap-1.5"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={
                status ? 'green' : 'red'
            } width={24} height={24} className="inline-block mr-1" style={{verticalAlign: 'middle'}
            }><path d="M18.3277 4.25809L10.5858 12L12 13.4142L19.7419 5.6723C21.153 7.39641 22 9.5999 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C14.4001 2 16.6036 2.84695 18.3277 4.25809Z"></path></svg>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {status ? 'Activo' : 'Inactivo'}
            </span>
        </div>
    )
}

export const FormatStatePlatillo = (status: boolean | string) => {
    return (
        <div
            className="flex items-center gap-1.5"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={
                status ? 'green' : 'red'
            } width={24} height={24} className="inline-block mr-1" style={{verticalAlign: 'middle'}
            }><path d="M18.3277 4.25809L10.5858 12L12 13.4142L19.7419 5.6723C21.153 7.39641 22 9.5999 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C14.4001 2 16.6036 2.84695 18.3277 4.25809Z"></path></svg>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {status ? 'Listo' : 'En proceso'}
            </span>
        </div>
    )
}

export const FormatStateMesa = (status: boolean | string) => {
    return (
        <div
            className="flex items-center gap-1.5"
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={
                !status ? 'green' : 'red'
            } width={24} height={24} className="inline-block mr-1" style={{ verticalAlign: 'middle' } 
                }><path d="M18.3277 4.25809L10.5858 12L12 13.4142L19.7419 5.6723C21.153 7.39641 22 9.5999 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C14.4001 2 16.6036 2.84695 18.3277 4.25809Z"></path></svg>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${!status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {status ? 'Ocupada' : 'Libre'}
            </span>
        </div>
    )
}