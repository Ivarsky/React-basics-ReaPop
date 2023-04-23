import classNames from 'classnames';

// eslint-disable-next-line react/prop-types
const Textarea = ({ className, ...props }) => {
  return (
    <div className={classNames('textarea', className)}>
      <textarea className="textarea-input" {...props} />
    </div>
  );
};

export default Textarea;
