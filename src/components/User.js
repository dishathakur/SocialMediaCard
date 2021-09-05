
const User = (name) => {
    return (
        <div style={{ float: 'left' }}>
            {console.log('idhar', name)}
            By {name['name']}
        </div>
    )
}

export default User;
