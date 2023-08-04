import React from "react";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";

function ImagenConTooltip(props) {
	return (
		<OverlayTrigger overlay={<Tooltip>{props.texto}</Tooltip>} placement="top">
			<Image width="20px" className="mx-2" src={props.imagen} alt={props.alt} />
		</OverlayTrigger>
	);
}

export default ImagenConTooltip;
