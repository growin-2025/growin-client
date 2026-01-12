import { BASE_WS_URL } from "@/api/urls";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";

/**
 * WebSocket 연결 상태
 */
export type ConnectionStatus = "connecting" | "connected" | "disconnected";

/**
 * WebSocket 클라이언트 싱글톤
 * - STOMP over WebSocket 연결 관리
 * - 전역에서 단일 연결 유지
 * - 자동 재연결 지원
 */
class WebSocketClient {
  private client: Client | null = null;
  private connectionStatus: ConnectionStatus = "disconnected";
  private statusListeners: Set<(status: ConnectionStatus) => void> = new Set();
  private accessToken: string | null = null;

  /**
   * WebSocket 연결 초기화
   * @param accessToken - 인증 토큰
   */
  connect(accessToken: string): void {
    if (this.client?.connected) {
      console.log("[WebSocket] 이미 연결되어 있습니다.");
      return;
    }

    this.accessToken = accessToken;
    this.updateStatus("connecting");

    // STOMP 클라이언트 생성
    this.client = new Client({
      brokerURL: BASE_WS_URL,

      /**
       * Upgrade header error 때문에 주석처리
       */
      // React Native의 WebSocket을 사용
      // webSocketFactory: () => new WebSocket(BASE_WS_URL),

      // 연결 헤더에 accessToken 추가
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },

      // 재연결 설정
      reconnectDelay: 5000, // 5초마다 재연결 시도
      heartbeatIncoming: 10000, // 서버로부터 받는 신호 주기 (10초)
      heartbeatOutgoing: 10000, // 클라이언트가 보내는 신호 주기 (10초)

      forceBinaryWSFrames: true, // 바이너리 프레임 강제 (데이터 손상 및 인코딩 방지)
      appendMissingNULLonIncoming: true, // RN의 마지막 NULL 문자 누락 방지

      // 연결 직전 로그 확인
      beforeConnect: () => {
        console.log("[WebSocket] 연결 시도 직전...");
      },

      // 디버그 로그
      debug: (str) => {
        console.log("[STOMP Debug]", str);
      },

      // 연결 성공 콜백
      onConnect: () => {
        console.log("[WebSocket] 연결 성공");
        this.updateStatus("connected");
      },

      // 연결 종료 콜백
      onDisconnect: () => {
        console.log("[WebSocket] 연결 종료");
        this.updateStatus("disconnected");
      },

      // 에러 콜백
      onStompError: (frame) => {
        console.error("[WebSocket] STOMP 에러:", frame.headers["message"]);
        console.error("[WebSocket] 에러 상세:", frame.body);
        // this.updateStatus("disconnected");
      },

      // WebSocket 에러 콜백
      onWebSocketError: (event) => {
        console.error("[WebSocket] WebSocket 에러:", JSON.stringify(event));
      },
    });

    // 연결 활성화
    this.client.activate();
  }

  /**
   * WebSocket 연결 해제
   */
  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
      this.updateStatus("disconnected");
      console.log("[WebSocket] 연결 해제");
    }
  }

  /**
   * 구독 생성
   * @param destination - 구독 경로
   * @param callback - 메시지 수신 콜백
   * @returns 구독 객체 (구독 해제용)
   */
  subscribe(
    destination: string,
    callback: (message: IMessage) => void
  ): StompSubscription | null {
    if (!this.client?.connected) {
      console.error("[WebSocket] 연결되지 않아 구독할 수 없습니다.");
      return null;
    }

    const subscription = this.client.subscribe(destination, callback);
    console.log(`[WebSocket] 구독 성공: ${destination}`);
    return subscription;
  }

  /**
   * 메시지 발행
   * @param destination - 발행 경로
   * @param body - 메시지 본문
   */
  publish(destination: string, body: string): void {
    if (!this.client?.connected) {
      console.error("[WebSocket] 연결되지 않아 메시지를 보낼 수 없습니다.");
      return;
    }

    this.client.publish({
      destination,
      body,
    });
    console.log(`[WebSocket] 메시지 발행: ${destination}`);
  }

  /**
   * 현재 연결 상태 반환
   */
  getStatus(): ConnectionStatus {
    return this.connectionStatus;
  }

  /**
   * 연결 상태 변경 리스너 등록
   * @param listener - 상태 변경 콜백
   * @returns 리스너 제거 함수
   */
  onStatusChange(listener: (status: ConnectionStatus) => void): () => void {
    this.statusListeners.add(listener);
    // 현재 상태 즉시 전달
    listener(this.connectionStatus);

    // 리스너 제거 함수 반환
    return () => {
      this.statusListeners.delete(listener);
    };
  }

  /**
   * 연결 상태 업데이트 및 리스너 호출
   */
  private updateStatus(status: ConnectionStatus): void {
    this.connectionStatus = status;
    this.statusListeners.forEach((listener) => listener(status));
  }

  /**
   * 연결 여부 확인
   */
  isConnected(): boolean {
    return this.client?.connected ?? false;
  }
}

// 싱글톤 인스턴스 생성 및 export
export const websocketClient = new WebSocketClient();
