import s from './styles.module.scss';

export interface IColorPaletteProps {
  onColorSelect: (color: string) => void;
}

const ColorPalette = ({ onColorSelect }: IColorPaletteProps) => {
  const COLORS = ['red', 'yellow', 'blue', 'green'];

  return (
    <div className={s.palette}>
      {COLORS.map((color) => (
        <button
          key={color}
          className={s.swatch}
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
