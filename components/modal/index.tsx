import * as React from 'react';
import { View, Image } from 'remax/alipay';
import clsx from 'clsx';
import './index.css';

export interface ModalProps {
  className?: string;
  topImageSize?: 'sm' | 'md' | 'lg';
  showClose?: boolean;
  closeType?: '0' | '1';
  disableScroll?: boolean;
  advice?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  topImage?: string;
  show: boolean;
  onModalClick?: () => void;
  onModalClose?: () => void;
}

export default class Model extends React.Component<ModalProps> {
  static defaultProps = {
    className: '',
    topImageSize: 'md',
    showClose: true,
    closeType: '0',
    disableScroll: true,
  };

  onModalClick = () => {
    const { onModalClick } = this.props;
    if (onModalClick) {
      onModalClick();
    }
  };

  onModalClose = () => {
    const { onModalClose } = this.props;
    if (onModalClose) {
      onModalClose();
    }
  };

  render() {
    const {
      show,
      disableScroll,
      advice,
      header,
      footer,
      topImage,
      className,
      topImageSize,
      showClose,
      closeType,
      children,
    } = this.props;

    return (
      <View className={`am-modal-${show ? 'show' : 'hide'}`} disableScroll={disableScroll}>
        <View className="am-modal-mask" />
        <View className={clsx('am-modal-document', { 'am-modal-document-advice': advice })}>
          <View className={clsx('am-modal', className)}>
            {topImage && (
              <View className={`am-modal-image am-modal-image-${topImageSize}`}>
                <Image src={topImage} />
              </View>
            )}
            {header && <View className="am-modal-header">{header}</View>}
            <View className="am-modal-body">{children}</View>
            {footer && (
              <View className="am-modal-footer" hover-class="am-modal-footer-active" onTap={this.onModalClick}>
                {footer}
              </View>
            )}
            {showClose && (
              <View
                className={clsx('am-modal-close', { 'am-modal-close-white': closeType === '1' })}
                hover-class="am-modal-close-active"
                onTap={this.onModalClose}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}
