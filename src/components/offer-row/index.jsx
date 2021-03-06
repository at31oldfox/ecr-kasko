import React, {Component} from "react";
import {Checkbox} from "antd";

import './style.scss';
import PropTypes from "prop-types";
import pluralFromArray from "../../helpers/pluralFromArray";
import {formatMoney} from "../../helpers/formatMoney";

class OfferRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rowsCollapsed: true,
			offerSelected: {},
			optionsToggle: {}
		};
	}
	
	static propTypes = {
		children: PropTypes.node,
		innerWidth: PropTypes.number,
		selectedOffer: PropTypes.func,
		offers: PropTypes.array,
	};

	onSelectOfferToggle = (company, index) => {
		let options = Object.assign({}, this.state.offerSelected)

		if (index in options) {
			options[index] = !options[index]
		} else {
			options[index] = true
		}
		
		if (options[index]) {
			this.props.selectedOffer(company, index)
		}

		this.setState({offerSelected: options})
	}
	
	onCollapseToggle = () => {
		this.setState({rowsCollapsed: !this.state.rowsCollapsed})
	}

	addOptionFlag (index) {
		let options = Object.assign({}, this.state.optionsToggle)

		if (index in options) {
			options[index] = !options[index]
		} else {
			options[index] = true
		}
		
		this.setState({optionsToggle: options})
	}

	render() {
		const {offers, logo, company, completed} = this.props
		const moreLink = 'еще ' + (offers.length - 1) + ' ' + pluralFromArray(['тариф', 'тарифа', 'тарифов'], (offers.length - 1))
		
		return (
			<>
				{offers.map((o, i) => {
					const show = (i === 0 || !this.state.rowsCollapsed)
					const showOptions = (i in this.state.optionsToggle) && this.state.optionsToggle[i]
					const offerSelected = (i in this.state.offerSelected) && this.state.offerSelected[i]
					
					return (show ? 
							<>
								<tr key={i} className={(showOptions ? "expanded" : "") + (offerSelected ? " selected" : "")}>
									<td>
										{i === 0 ? <div className="offer-row__logo"><img src={logo} alt=""/></div> : ""}
									</td>
									<td>
										<div className="offer-row__name">{o.name}</div>
										{(i === 0 && offers.length > 1) ? <div onClick={this.onCollapseToggle} className="offer-row__hint gl_link">{moreLink}</div> : ""}
									</td>
									<td>
										<div className="offer-row__price">{formatMoney(o.price)} ₽</div>
									</td>
									<td>
										<div className="offer-row__fee">{formatMoney(o.dealerFee)} ₽</div>
									</td>
									
									{ completed ?
										<>
											<td>
												<div className="offer-row__date">{o.dateStart}</div>
												<div className="offer-row__date">{o.dateEnd}</div>
											</td>
											<td className="text_left">
												<div className="offer-row__documents">
													<div className="gl_link color_black">{o.document}</div>
													<div className="offer-row__bill gl_link">Счет на оплату</div>
												</div>
											</td>
											<td>
												<div className="offer-row__status approved"/>
											</td>
										</>
									: 
										<>
											<td>
												<Checkbox className="offer-row__check" onChange={() => this.onSelectOfferToggle(company, i)}/>
											</td>
											<td>
												<div onClick={() => this.addOptionFlag(i)} className="offer-row__link"/>
											</td>
										</>
									}
								</tr>
								{!completed && showOptions ?
									<tr key={i + 100000}
										className={(offerSelected ? "selected" : "")}>
										<td>&nbsp;</td>
										<td colSpan={4}>
											<ul className="offer-row__options">
												{o.options.map(opt => <li>{opt}</li>)}
											</ul>
										</td>
										<td>&nbsp;</td>
									</tr>
									: ""}
							</>
							: ""
					)
				})}
			</>
		);
	}
}

export default OfferRow;

