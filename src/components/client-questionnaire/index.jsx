import React, {Component} from "react";
import {Col, Row, Upload, message} from "antd";
import './style.scss';
import PropTypes from "prop-types";

const {Dragger} = Upload;

class ClientQuestionnaire extends Component {
	static propTypes = {
		children: PropTypes.node,
		allFields: PropTypes.bool,
		innerWidth: PropTypes.number
	};

	render() {
		const uploadProps = {
			name: 'file',
			multiple: true,
			action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
			onChange(info) {
				const {status} = info.file;
				if (status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if (status === 'done') {
					message.success(`${info.file.name} file uploaded successfully.`);
				} else if (status === 'error') {
					message.error(`${info.file.name} file upload failed.`);
				}
			},
		};

		return (
			<div className="client-questionnaire">
				<Row gutter={20}>
					<Col span={12}>
						<Dragger className="client-questionnaire__upload" {...uploadProps}>
							<div className="client-questionnaire__upload--icon" />
							<div className="client-questionnaire__upload--info">
								<div className="client-questionnaire__upload--text">Выберите документ <br/> или перетяните
									его сюда</div>
								<div className="client-questionnaire__upload--hint">
									Принимаются файлы в форматах <br/>
									png, jpg, pdf не тяжелее 10 Мб
								</div>
							</div>
						</Dragger>
					</Col>
					<Col span={12}>
						<ul className="client-questionnaire__faq">
							<li className="client-questionnaire__faq--item">
								<div className="client-questionnaire__faq--title">Паспорт РФ</div>
								<p>Банки требуют все страницы паспорта, в т.ч. незаполненные.</p>
							</li>
							<li className="client-questionnaire__faq--item">
								<div className="client-questionnaire__faq--title">Водительское удостоверение / Второй документ</div>
								<p>Большинство банков в качестве второго документа принимают только ВУ. Необходим скан с двух сторон</p>
							</li>
						</ul>
					</Col>
				</Row>
			</div>
		);
	}
}

export default ClientQuestionnaire;
