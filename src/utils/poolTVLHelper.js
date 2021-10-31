import {useState} from 'react'

function GetPoolTVL (address){	
	const [obj, setObj] = useState({'-1': 0});
	return obj[address.toLowerCase()]
}

function  SetPoolTVL(_address, val) {
	const [obj, setObj] = useState({'-1': 0});
	const address = _address.toLowerCase();
	setObj(prevState =>({...prevState, address: val}));
}

export {GetPoolTVL, SetPoolTVL}