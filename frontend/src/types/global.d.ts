declare global {
  interface Window {
    kakao: {
      maps: {
        // === 지도 ===
        Map: new (container: HTMLElement, options: MapOptions) => KakaoMap;

        // === 좌표 ===
        LatLng: new (lat: number, lng: number) => LatLng;
        LatLngBounds: new () => LatLngBounds;

        // === 마커 ===
        Marker: new (options: MarkerOptions) => Marker;
        MarkerImage: new (
          src: string,
          size: Size,
          options?: any
        ) => MarkerImage;

        // === 오버레이 ===
        InfoWindow: new (options: InfoWindowOptions) => InfoWindow;
        CustomOverlay: new (options: CustomOverlayOptions) => CustomOverlay;

        // === 도형 ===
        Polyline: new (options: PolylineOptions) => Polyline;
        Polygon: new (options: PolygonOptions) => Polygon;
        Circle: new (options: CircleOptions) => Circle;

        // === 기본 타입 ===
        Size: new (width: number, height: number) => Size;
        Point: new (x: number, y: number) => Point;

        // === 서비스 ===
        services: {
          Places: new (map?: KakaoMap) => Places;
          Geocoder: new () => Geocoder;
          Status: {
            OK: "OK";
            ZERO_RESULT: "ZERO_RESULT";
            ERROR: "ERROR";
          };
        };

        // === 이벤트 ===
        event: {
          addListener: (target: any, type: string, callback: Function) => void;
          removeListener: (
            target: any,
            type: string,
            callback: Function
          ) => void;
          trigger: (target: any, type: string, data?: any) => void;
        };

        // === 지도 타입 ===
        MapTypeId: {
          ROADMAP: "ROADMAP";
          SKYVIEW: "SKYVIEW";
          HYBRID: "HYBRID";
        };

        // === 컨트롤 ===
        MapTypeControl: new () => MapTypeControl;
        ZoomControl: new () => ZoomControl;

        ControlPosition: {
          TOP: 1;
          TOPLEFT: 2;
          TOPRIGHT: 3;
          LEFT: 4;
          RIGHT: 5;
          BOTTOMLEFT: 6;
          BOTTOM: 7;
          BOTTOMRIGHT: 8;
        };
      };
    };
  }
}

// === 인터페이스 정의 ===
interface LatLng {
  getLat(): number;
  getLng(): number;
}

interface KakaoMap {
  setCenter(latlng: LatLng): void;
  getCenter(): LatLng;
  setLevel(level: number, options?: { animate?: boolean }): void;
  getLevel(): number;
  panTo(latlng: LatLng): void;
  relayout(): void;
}

interface MapOptions {
  center: LatLng;
  level?: number;
  mapTypeId?: string;
}

interface Marker {
  setMap(map: KakaoMap | null): void;
  getPosition(): LatLng;
  setPosition(position: LatLng): void;
  setImage(image: MarkerImage): void;
}

interface MarkerOptions {
  position: LatLng;
  map?: KakaoMap;
  image?: MarkerImage;
  title?: string;
  clickable?: boolean;
}

interface InfoWindow {
  open(map: KakaoMap, marker: Marker): void;
  close(): void;
  setContent(content: string): void;
}

interface InfoWindowOptions {
  content: string;
  removable?: boolean;
  position?: LatLng;
}

interface CustomOverlay {
  setMap(map: KakaoMap | null): void;
  setPosition(position: LatLng): void;
}

interface CustomOverlayOptions {
  content: string | HTMLElement;
  position: LatLng;
  map?: KakaoMap;
  xAnchor?: number;
  yAnchor?: number;
  zIndex?: number;
}

interface Size {
  width: number;
  height: number;
}

interface MarkerImage {
  // 마커 이미지 객체
}

interface Places {
  keywordSearch(
    keyword: string,
    callback: (result: any[], status: string) => void,
    options?: PlacesSearchOptions
  ): void;
}

interface PlacesSearchOptions {
  location?: LatLng;
  radius?: number;
  bounds?: LatLngBounds;
  page?: number;
  size?: number;
}

interface Geocoder {
  addressSearch(
    address: string,
    callback: (result: any[], status: string) => void
  ): void;
  coord2Address(
    lng: number,
    lat: number,
    callback: (result: any[], status: string) => void
  ): void;
}

interface PolylineOptions {
  path: LatLng[];
  strokeWeight?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeStyle?: string;
}

interface PolygonOptions extends PolylineOptions {
  fillColor?: string;
  fillOpacity?: number;
}

interface CircleOptions {
  center: LatLng;
  radius: number;
  strokeWeight?: number;
  strokeColor?: string;
  fillColor?: string;
  fillOpacity?: number;
}

interface LatLngBounds {
  extend(latlng: LatLng): void;
  contain(latlng: LatLng): boolean;
}

interface MapTypeControl {}
interface ZoomControl {}
interface Polyline {}
interface Polygon {}
interface Circle {}

export {};
