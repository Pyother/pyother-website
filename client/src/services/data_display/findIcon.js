import { RiJavascriptFill as JsIcon } from "react-icons/ri";
import { SiPython as PythonIcon } from "react-icons/si";
import { GrRaspberry as RpiIcon } from "react-icons/gr";
import { BiLogoTypescript as TsIcon } from "react-icons/bi";
import { PiFileCppThin as CppIcon } from "react-icons/pi";
import { FaReact as ReactIcon } from "react-icons/fa";
import { FaAngular as AngularIcon } from "react-icons/fa";
import { SiDjango as DjangoIcon } from "react-icons/si";
import { FaNodeJs as NodeIcon } from "react-icons/fa";

const iconMap = {
    'python': { icon: PythonIcon, backgroundColor: '#3776AB', color: '#FFFFFF' },
    'js': { icon: JsIcon, backgroundColor: '#F7DF1E', color: '#323330' },
    'javascript': { icon: JsIcon, backgroundColor: '#F7DF1E', color: '#323330' },
    'ts': { icon: TsIcon, backgroundColor: '#3178C6', color: '#FFFFFF' },
    'cpp': { icon: CppIcon, backgroundColor: '#00599C', color: '#FFFFFF' },
    'c++': { icon: CppIcon, backgroundColor: '#00599C', color: '#FFFFFF' },
    'rpi': { icon: RpiIcon, backgroundColor: '#A22846', color: '#FFFFFF' },
    'raspberry': { icon: RpiIcon, backgroundColor: '#A22846', color: '#FFFFFF' },
    'raspberry-pi': { icon: RpiIcon, backgroundColor: '#A22846', color: '#FFFFFF' },
    'react': { icon: ReactIcon, backgroundColor: '#61DAFB', color: '#20232A' },
    'angular': { icon: AngularIcon, backgroundColor: '#DD0031', color: '#FFFFFF' },
    'django': { icon: DjangoIcon, backgroundColor: '#092E20', color: '#FFFFFF' },
    'dj': { icon: DjangoIcon, backgroundColor: '#092E20', color: '#FFFFFF' },
    'nodejs': { icon: NodeIcon, backgroundColor: '#339933', color: '#FFFFFF' },
    'node': { icon: NodeIcon, backgroundColor: '#339933', color: '#FFFFFF' },
    'node.js': { icon: NodeIcon, backgroundColor: '#339933', color: '#FFFFFF' },
    'node-js': { icon: NodeIcon, backgroundColor: '#339933', color: '#FFFFFF' },
    'react-native': { icon: ReactIcon, backgroundColor: '#20232A', color: '#00d8ff' },
    'reactnative': { icon: ReactIcon, backgroundColor: '#20232A', color: '#00d8ff' },
};

const findIcon = (name) => {
    return iconMap[name] || null;
}

export default findIcon;
