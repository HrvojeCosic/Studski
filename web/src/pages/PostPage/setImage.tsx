const setImage = (fileName: string) => {
	let src = '';
	switch (fileName.slice(-3)) {
		case 'pdf':
			src = '../../icons/extensionIcons/pdf.png';
			break;
		case 'doc':
		case 'docx':
		case 'docm':
		case 'rtf':
		case 'dot':
		case 'dotx':
		case 'dotm':
		case 'odt':
			src = '../../icons/extensionIcons/doc.png';
			break;
		case 'mht':
		case 'mhtml':
		case 'htm':
		case 'html':
			src = '../../icons/extensionIcons/html.png';
			break;
		case 'css':
			src = '../../icons/extensionIcons/css.png';
			break;
		case 'jpg':
		case 'jpeg':
			src = '../../icons/extensionIcons/jpg.png';
			break;
		case 'mp3':
			src = '../../icons/extensionIcons/mp3.png';
			break;
		case 'ppt':
			src = '../../icons/extensionIcons/ppt.png';
			break;
		case 'xls':
			src = '../../icons/extensionIcons/xls.png';
			break;
		case 'zip':
			src = '../../icons/extensionIcons/zip.png';
			break;
		case 'txt':
			src = '../../icons/extensionIcons/txt.png';
			break;
		default:
			src = '../../icons/extensionIcons/other.png';
	}

	const image = <img src={src} className='image' alt={'extension icon'} />;
	return image;
};

export default setImage;
