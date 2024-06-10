import { RemoteSVG, _RemoteSVG } from '../../libraries/HTML'

import _NekoIconFilled from '../../assets/icons/neko_icon_filled.svg'
import _NekoIconOutlined from '../../assets/icons/neko_icon_outlined.svg'

export const NekoIconFilled = async (): Promise<_RemoteSVG> => await RemoteSVG(_NekoIconFilled)
export const NekoIconOutlined = async (): Promise<_RemoteSVG> => await RemoteSVG(_NekoIconOutlined)
