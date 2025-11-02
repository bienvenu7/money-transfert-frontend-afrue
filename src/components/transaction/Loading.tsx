interface LoadingProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Loading({
  message = 'Chargement...',
  size = 'medium',
}: LoadingProps) {
  const sizeClasses = {
    small: 'loading--small',
    medium: 'loading--medium',
    large: 'loading--large',
  };

  return (
    <div className={`loading ${sizeClasses[size]}`}>
      <div className='loading__spinner'>
        <div className='loading__spinner--circle'></div>
      </div>
      <p className='loading__message'>{message}</p>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className='loading__skeleton'>
      <div className='loading__skeleton--top'></div>
      <div className='loading__skeleton--bottom'></div>
    </div>
  );
}
