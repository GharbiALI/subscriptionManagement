import { mapActiveSubscriptionResponse } from "../../src/mapper/subscription.mapper"; // Adjust path as needed
import { ISubscription } from "../../src/schemas/subscription.schemas";
import { Types } from "mongoose";

describe('mapActiveSubscriptionResponse ', () => {
  it('should correctly calculate days left using a hardcoded future date', () => {
    //given
    const msPerDay = 1000 * 60 * 60 * 24;
    const staticFutureDate = new Date('2026-12-25T00:00:00.000Z');
    const expectedDays = Math.ceil((staticFutureDate.getTime() - Date.now()) / msPerDay);

    const mockSubscription = {
      userId: new Types.ObjectId(),
      startDate: new Date(),
      expiryDate: staticFutureDate,
      status: 'active' as const,
      productId: {
        _id: new Types.ObjectId(),
        name: 'chatggpt',
        companyName: 'klo',
        price: 49.99
      }
    } as ISubscription & { productId: any };

    //when
    const result = mapActiveSubscriptionResponse(mockSubscription);

    //then
    expect(result).toBe(`chatggpt will expire in ${expectedDays} days`);
  });
});

