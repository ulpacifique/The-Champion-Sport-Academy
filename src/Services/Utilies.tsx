const formatDate =(dateString: string)=>{
    const data=new Date(dateString);

 const options={year:'numeric' as const, month:'short' as const};

    return data.toLocaleString('en-US', options);
}
export {formatDate};