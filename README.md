### 自动动画组件底层实现包

#### 利用 MutationObserver 实现节点的变化监听， ResizeObserver 实现窗口变化监听

#### 上层各框架可根据框架实现 封装组件。

##### 在 React 中上层封装
```react
import { memo, useRef, useEffect } from 'react';
import autoAnimate from '@ii-coding/auto-animate';
import type { ReactNode, ReactElement, FC } from 'react';
import type { AutoAnimateOptions } from '@ii-coding/auto-animate/type';

interface IProps extends Partial<AutoAnimateOptions> {
  children: ReactNode | ReactElement;
  className?: string;
}

const A: FC<IProps> = (props) => {
  const { children, className, ...animateOptions } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const animateRef = useRef<ReturnType<typeof autoAnimate> | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      animateRef.current = autoAnimate(containerRef.current, animateOptions);
    }

    return () => {
      animateRef.current?.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

const AutoAnimate = memo(A);

export default AutoAnimate;
```
#### 未完成事项：
    - 具体调用配置参数未底层逻辑实现
    - 各上层框架组件封装案例未完善
    - 组件封装调用的自动化控制未实现

> 计划在1.0版本中 实现以上待办
