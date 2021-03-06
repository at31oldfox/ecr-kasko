import React, {Component} from "react";

import './style.scss';
import PropTypes from "prop-types";


class AsideCrumbs extends Component {
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number,
	};

	render() {
		const {crumbs} = this.props;
		
		const crumbHtml = crumbs.map((c, i) => <li key={i} className="aside-crumbs__item">{c}</li>);
		
		return (
			<ul className="aside-crumbs">
				{crumbHtml}
			</ul>
		);
	}
}

export default AsideCrumbs;