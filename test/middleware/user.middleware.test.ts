import { Request, Response, NextFunction } from "express";
import { validateUserMiddleware } from "../../src/middleware/user.middleware";

const mockRequest = (body: object): Partial<Request> => ({ body });

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext: NextFunction = jest.fn();

describe("user.middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("validateUserMiddleware", () => {
    it("should call next() when all inputs are valid", () => {
      const req = mockRequest({ name: "Alice", email: "alice@example.com", password: "password123" });
      const res = mockResponse();

      validateUserMiddleware(req as Request, res as Response, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("should respond with 400 when name is missing", () => {
      const req = mockRequest({ email: "alice@example.com", password: "password123" });
      const res = mockResponse();

      validateUserMiddleware(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.anything() })
      );
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should respond with 400 when email is invalid", () => {
      const req = mockRequest({ name: "Alice", email: "invalid", password: "password123" });
      const res = mockResponse();

      validateUserMiddleware(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should respond with 400 when password is too short", () => {
      const req = mockRequest({ name: "Alice", email: "alice@example.com", password: "123" });
      const res = mockResponse();

      validateUserMiddleware(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should respond with 400 when body is empty", () => {
      const req = mockRequest({});
      const res = mockResponse();

      validateUserMiddleware(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});